import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa'; // Importing an edit icon from react-icons
import axios from 'axios';
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");

let baseUrl = 'http://localhost:3001/api/users';
const ContractPage = () => {
    const [formData, setFormData] = useState({
        contractorName: '',
        contactName: '',
        contractStatus: '',
    });

    const [contracts, setContracts] = useState([]);
    const [contractsList, setContractsList] = useState([]);


    const [editIndex, setEditIndex] = useState(false); // Track which contract is being edited


    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        getAllContractor()
        getAllContract()
    }, [])



    // useEffect(() => {
    //     // Listen for messages from the server
    //     socket.on("message", (data) => {
    //         console.info('datadatadatadata', data)
    //         //   setMessages((prevMessages) => [...prevMessages, data]);
    //     });

    //     // Clean up the listener on unmount
    //     return () => {
    //         socket.off("message");
    //     };
    // }, []);


    // const sendMessage = () => {
    //     if (message.trim()) {
    //         socket.emit("message", message); // Send message to the server
    //         setMessage(""); // Clear input field
    //     }
    // };

    const getAllContract = () => {
        axios.get(`${baseUrl}/getAppContracts`).then(res => {
            console.info('getAllContractgetAllContractgetAllContractgetAllContract', res)
            setContractsList(res.data.data)
        })
    }

    const getAllContractor = () => {
        axios.get(`${baseUrl}/getContractor`).then(res => {
            console.info('resresresresresresresres', res)
            setContracts(res.data.data)
        })
    }




    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.info('333333333', formData)
        if (formData.contractorName && formData.contractStatus) {
            console.info('ifififififififififififififififif', editIndex)
            if (editIndex) {
                // Update the existing contract
                const updatedContracts = [...contracts];
                updatedContracts[editIndex] = formData;
                setContracts(updatedContracts);

                let temp = {
                    contractor_id: formData.contractorName,
                    contract_name: formData.contactName,
                    status: formData.contractStatus
                }
                console.info('4444444', temp)
                axios.post(`${baseUrl}/updateContract`, temp,).then(res => {
                    console.info('resresresresresresresresresres', res);

                    socket.emit("message", 'asdasdasd'); // Emit message to server
                    //   setMessage(""); // Clear the input field



                    setEditIndex(false)
                })
                setEditIndex(null);
            } else {
                let temp = {
                    contractor_id: formData.contractorName,
                    contract_name: formData.contactName,
                    status: formData.contractStatus
                }
                console.info('123123123123123123', temp)
                axios.post(`${baseUrl}/createContract`, temp,).then(res => {
                    console.info('resresresresresresresresresres', res);
                })
                // Add a new contract
                setContracts((prevContracts) => [...prevContracts, formData]);
            }

            setFormData({
                contractorName: '',
                // contactName: '',
                contractStatus: '',
            });
        }
    };

    const handleEdit = (index) => {
        console.info('indexindexindexindexindexindex', index)
        let temp = {

            contractorName: index.contractor_id,
            contactName: index.contract_name,
            contractStatus: index.status

        }
        setFormData(temp); // Load the selected contract data into the form
        setEditIndex(true); // Set the index of the contract being edited
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={headerStyle}>Create or Edit Contract</h1>
            {/* {console.info('contractscontractscontractscontractscontracts', contracts)} */}
            {/* Form */}
            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Contract name:</label>
                    <select
                        name="contractorName"
                        // defaultValue={contractsList.username || ""}
                        onChange={handleInputChange}
                        style={inputStyle}
                    >
                        <option value={''}>Select Contractor</option>
                        {contracts.map(item => {
                            return <option value={item.id}>{item.name}</option>
                        })}
                    </select>
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Contact Name:</label>
                    <input
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        style={inputStyle}
                        required
                    />
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Contract Status:</label>
                    <select
                        name="contractStatus"
                        value={formData.contractStatus}
                        onChange={handleInputChange}
                        style={inputStyle}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <button type="submit" style={buttonStyle}>{editIndex !== null ? 'Update Contract' : 'Create Contract'}</button>
            </form>

            {/* Contracts List */}
            <h2 style={headerStyle}>Contracts List</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                {contractsList.map((contract, index) => (
                    <div key={index} style={cardStyle}>
                        <h3>{contract.contractor_id}</h3>
                        <p><strong>Contact Name:</strong> {contract.contract_name}</p>
                        <p><strong>Contract Status:</strong> {contract.status}</p>
                        <button onClick={() => handleEdit(contract)} style={editButtonStyle}>
                            <FaEdit /> Edit
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Styles
const formStyle = {
    marginBottom: '20px',
    maxWidth: '400px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const inputGroupStyle = {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
};

const labelStyle = {
    marginBottom: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
};

const inputStyle = {
    padding: '10px',
    fontSize: '14px',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
};

const buttonStyle = {
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

const headerStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
};

const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    width: '300px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    position: 'relative',
};

const editButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#007BFF',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
};

export default ContractPage;
