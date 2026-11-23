

class Invoice {
    constructor(id, customerId, date, items) {
        this.id = id || crypto.randomUUID();
        this.customerId = customerId;
        this.date = date;
        this.items = items || [];
    }

    addItem(item) {
        this.items.forEach(existingItem => {
            if (existingItem.id === item.id) {
                existingItem.description = item.description;
                existingItem.quantity = item.quantity;
                existingItem.unitPrice = item.unitPrice;
                existingItem.itemType = item.itemType;
                console.log(`Item with id ${item.id} already exists. Updated the existing item.`);
                return;
            }
        });
        this.items.push(item);
        console.log(`Added new item with id ${item.id}.`);
    }

    totalAmount() {
        let total = 0;
        for (const item of this.items) {
            if (item.itemType === 'payment') {
                total -= (item.unitPrice * item.quantity);
            } else {
                total += (item.unitPrice * item.quantity);
            }
        }
        return total;
    }

    sortItemsByType() {
        this.items.sort((a, b) => {
            const order = { 'general': 1, 'labor': 2, 'payment': 3 };
            return order[a.itemType] - order[b.itemType];
        });
        console.log("Sorted items by type.");
    }
}


class InvoiceItem {
    constructor(id, description, quantity, unitPrice, itemType) {
        this.id = id || crypto.randomUUID();
        this.description = description || "";
        this.quantity = quantity || 0;
        this.unitPrice = unitPrice || 0;
        if (itemType !== 'general' && itemType !== 'labor' && itemType !== 'payment') {
            throw new Error("Invalid itemType. Must be 'general', 'labor', or 'payment'.");
        }
        this.itemType = itemType || "general"; // default to general
    }
}