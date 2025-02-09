document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the username from localStorage (default to "User" if not found)
    const username = localStorage.getItem('username') || "User";
    document.getElementById('usernameDisplay').innerText = username;

    const viewStatementBtn = document.getElementById('viewStatementBtn');
    const statementContainer = document.getElementById('statementContainer');
    const statementBody = document.getElementById('statementBody');

    // Function to generate random transactions
    function generateFakeTransactions() {
        const fakeTransactions = [];
        const descriptions = ["Deposit", "ATM Withdrawal", "Payment", "Transfer", "Interest Earned"];
        let balance = 5000; // Start balance for the statement

        for (let i = 0; i < 10; i++) { // Generate 10 fake transactions
            const date = new Date();
            date.setDate(date.getDate() - i); // Fake date, goes back from today
            const transactionDate = date.toLocaleDateString();

            const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];
            const randomAmount = Math.floor(Math.random() * 500 + 10); // Random amount between 10 and 500
            const amount = randomDesc === "Deposit" ? randomAmount : -randomAmount; // Deposits are positive, others are negative

            balance += amount; // Update balance

            fakeTransactions.push({
                date: transactionDate,
                description: randomDesc,
                amount: amount,
                balance: balance
            });
        }

        return fakeTransactions;
    }

    // Function to display fake statement
    function displayFakeStatement() {
        const transactions = generateFakeTransactions();
        statementBody.innerHTML = ''; // Clear previous statement content

        transactions.forEach(transaction => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${transaction.date}</td>
                <td>${transaction.description}</td>
                <td>${transaction.amount < 0 ? '-' : '+'} $${Math.abs(transaction.amount)}</td>
                <td>$${transaction.balance}</td>
            `;
            statementBody.appendChild(row);
        });

        // Show the statement container
        statementContainer.style.display = 'block';
    }

    // Event listener for the "View Full Statement" button
    viewStatementBtn.addEventListener('click', displayFakeStatement);
});
