let inventory = [];
let customers = [];

function renderInventory() {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = '';
    inventory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.quantity} - Price: $${item.price}`;
        inventoryList.appendChild(li);
    });
}

function renderCustomers() {
    const customerList = document.getElementById('customer-list');
    customerList.innerHTML = '';
    customers.forEach(customer => {
        const li = document.createElement('li');
        li.textContent = `${customer.name} - ${customer.address} - ${customer.phone}`;
        customerList.appendChild(li);
    });
}

function addProduct() {
    const name = prompt("Enter product name:");
    const quantity = parseInt(prompt("Enter quantity:"));
    const price = parseFloat(prompt("Enter price:"));
    if (name && quantity && price) {
        inventory.push({ name, quantity, price });
        renderInventory();
    } else {
        alert("Please enter valid input.");
    }
}

function addCustomer() {
    const name = prompt("Enter customer name:");
    const address = prompt("Enter customer address:");
    const phone = prompt("Enter customer phone:");
    if (name && address && phone) {
        customers.push({ name, address, phone });
        renderCustomers();
    } else {
        alert("Please enter valid input.");
    }
}

function generateBill() {
    const customerName = prompt("Enter customer name:");
    const selectedCustomer = customers.find(customer => customer.name === customerName);
    if (!selectedCustomer) {
        alert("Customer not found.");
        return;
    }

    const billForm = document.getElementById('billing-form');
    billForm.innerHTML = '';

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody id="bill-items">
            <!-- Bill items will be dynamically added here -->
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3">Total</td>
                <td id="total-amount"></td>
            </tr>
        </tfoot>
    `;
    billForm.appendChild(table);

    const billItems = document.getElementById('bill-items');
    let totalAmount = 0;
    inventory.forEach(item => {
        const quantity = parseInt(prompt(`Enter quantity of ${item.name}:`));
        if (quantity) {
            const total = item.price * quantity;
            totalAmount += total;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${quantity}</td>
                <td>$${item.price}</td>
                <td>$${total.toFixed(2)}</td>
            `;
            billItems.appendChild(row);
        }
    });

    document.getElementById('total-amount').textContent = `$${totalAmount.toFixed(2)}`;
}

window.onload = function() {
    // No initial data displayed
};
