let serverUrl = "http://localhost:8090/tray/v2/checks/";
let apiKey = "Rol0uaTCljwyDm7E3MBHbKhivdnXRxKc";

window.onload = function () {
    getCheckDetails();
};

function getCheckDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const checkId = urlParams.get('checkId');

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apiKey': apiKey
        },
    };

    // Make the GET request using fetch()
    fetch(serverUrl + checkId, options)
        .then(response => {
            // Check if response is successful (status code 200-299)
            if (response.ok) {
                return response.json(); // Parse response body as JSON
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            updateUI(data);

        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the GET request:', error);
        });
}

function updateUI(data) {
    document.getElementById("checkId").value = data.id;
    document.getElementById("checkIdLabel").innerHTML = "Check #" + data.id;

    let paymentTotal = 0;
    data.payments.forEach(payment => {
        paymentTotal += payment.base;
        paymentTotal += payment.tax;
    });
    document.getElementById("amount").innerHTML = "$ " + parseFloat(paymentTotal).toFixed(2);
}

function updateTableName() {
    let tableName = document.getElementById('tableName').value;
    let checkId = document.getElementById('checkId').value;

    // Data to be sent in the POST request (e.g., JSON data)
    const data = {
        checkId: checkId,
        location: tableName,
        sendPN: true
    };

    // Options for the fetch() function
    const options = {
        method: 'PUT', // HTTP method
        headers: {
            'Content-Type': 'application/json',
            'apiKey': apiKey
        },
        body: JSON.stringify(data) // Convert postData to JSON string
    };

    // Make the POST request using fetch()
    fetch(serverUrl + checkId, options)
        .then(response => {
            // Check if response is successful (status code 200-299)
            if (response.ok) {
                return response.json(); // Parse response body as JSON
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            // Handle the response data
            if(data.isSuccess) {
                alert("Table number updated successfully!")
                document.getElementById('tableName').value = "";
            } else {
                alert("Problem in updating table number.");
            }
            
        })
        .catch(error => {
            // Handle errors
            alert('Problem in updating table number', error);
        });
}



