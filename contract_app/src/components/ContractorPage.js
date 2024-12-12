import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from "socket.io-client";
let baseUrl = 'http://localhost:3001/api/users';

const socket = io("http://localhost:3001");
const Card = ({ name, contactName, contractStatus, contractorName }) => {
    // Inline styles for the card
    const cardStyle = {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px',
        width: '300px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        fontFamily: 'Arial, sans-serif',
    };

    const titleStyle = {
        marginBottom: '12px',
        fontSize: '20px',
        color: '#333',
    };

    const textStyle = {
        margin: '6px 0',
        fontSize: '16px',
        color: '#555',
    };

    return (
        <div style={cardStyle}>
            <h2 style={titleStyle}>{name}</h2>
            <p style={textStyle}>
                <strong>Contact Name:</strong> {contactName}
            </p>
            <p style={textStyle}>
                <strong>Contractor Name:</strong> {contractorName}
            </p>
            <p style={textStyle}>
                <strong>Contract Status:</strong> {contractStatus}
            </p>
        </div>
    );
};

// Sample data for testing
const App = () => {
    const [contract, setContract] = useState([]);
    useEffect(() => {
        getdata();
    },[])

    const getdata = () => {
        let user = window.sessionStorage.getItem("contractor");
        console.info('useruseruseruser', user)
        axios.get(`${baseUrl}/getContracts/${user}`).then(res => {
            console.info('sadfasdfasdfasdfasdf', res)
            setContract(res.data.data)
        })
    }


    useEffect(() => {
        // Listen for messages from the server
        socket.on("message", (data) => {
            getdata();

        });

        // Clean up the listener on unmount
        return () => {
            socket.off("message");
        };
    }, []);



    const cardData = [
        {
            name: 'John Doe',
            contactName: 'Jane Smith',
            contractorName: 'ABC Contractors',
            contractStatus: 'Active',
        },
        {
            name: 'Alice Johnson',
            contactName: 'Bob Brown',
            contractorName: 'XYZ Builders',
            contractStatus: 'Pending',
        },
        {
            name: 'Michael Lee',
            contactName: 'Emily Davis',
            contractorName: 'MNO Developers',
            contractStatus: 'Completed',
        },
    ];

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {contract.length > 0 && contract.map((data, index) => (   
                <Card
                    key={index}
                    // name={data.contractor_id}
                    contactName={data.contract_name}
                    contractorName={data.contractor_id}
                    contractStatus={data.status}
                />
            ))}
        </div>
    );
};

export default App;
