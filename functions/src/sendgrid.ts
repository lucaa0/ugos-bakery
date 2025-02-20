import * as sendgrid from "@sendgrid/mail";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface ShippingDetails {
  name: string;
  surname: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
}

interface OrderData {
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  shippingDetails: ShippingDetails;
  timestamp: Date;
  id: string;
}

export const sendOrderEmails = async (orderData: OrderData, customerEmail: string) => {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '');

  const { items, subtotal, shippingCost, total, shippingDetails, id } = orderData;

  const customerEmailContent = `
    <h1>Thank you for your order!</h1>
    <p>Order ID: ${id}</p>
    <h2>Order Summary</h2>
    <ul>
      ${items.map((item: OrderItem) => `
        <li>${item.name} - Quantity: ${item.quantity} - Price: €${item.price.toFixed(2)}</li>
      `).join('')}
    </ul>
    <p>Subtotal: €${subtotal.toFixed(2)}</p>
    <p>Shipping Cost: €${shippingCost.toFixed(2)}</p>
    <p>Total: €${total.toFixed(2)}</p>
    <h2>Shipping Address</h2>
    <p>${shippingDetails.name} ${shippingDetails.surname}</p>
    <p>${shippingDetails.address}</p>
    <p>${shippingDetails.city}, ${shippingDetails.postalCode}</p>
    <p>${shippingDetails.phone}</p>
    <p>Estimated delivery time: 3-5 business days</p>
  `;

    const ownerEmailContent = `
    <h1>New Order Received!</h1>
    <p>Order ID: ${id}</p>
    <h2>Order Summary</h2>
    <ul>
      ${items.map((item: OrderItem) => `
        <li>${item.name} - Quantity: ${item.quantity} - Price: €${item.price.toFixed(2)}</li>
      `).join('')}
    </ul>
    <p>Subtotal: €${subtotal.toFixed(2)}</p>
    <p>Shipping Cost: €${shippingCost.toFixed(2)}</p>
    <p>Total: €${total.toFixed(2)}</p>
    <h2>Shipping Address</h2>
    <p>${shippingDetails.name} ${shippingDetails.surname}</p>
    <p>${shippingDetails.address}</p>
    <p>${shippingDetails.city}, ${shippingDetails.postalCode}</p>
    <p>${shippingDetails.phone}</p>
    <h2>Customer Email</h2>
    <p>${customerEmail}</p>
  `;

  const customerMsg = {
    to: customerEmail,
    from: { email: 'ugosbakeryinfo@gmail.com', name: "Ugo's Bakery" },
    subject: `Ugo's Bakery - Order Confirmation #${id}`,
    html: customerEmailContent,
  };

  const ownerMsg = {
    to: 'ugosbakeryinfo@gmail.com',
    from: { email: 'ugosbakeryinfo@gmail.com', name: "Ugo's Bakery" }, // Use the same from address for consistency
    subject: `New Order Received - Order #${id}`,
    html: ownerEmailContent,
  };

  try {
    await sendgrid.send(customerMsg);
    await sendgrid.send(ownerMsg);
    console.log('Emails sent successfully');
  } catch (error: unknown) {
    console.error('Error sending emails:', error);
    if (error instanceof Error) {
      console.error(error.message); // Always safe to access .message
    }
    if (error instanceof Error && 'response' in error) {
      const response = (error as { response: any }).response;
      if (response && typeof response === 'object' && 'body' in response) {
        console.error(response.body);
      }
    }
    throw error; // Re-throw the error so the calling function can handle it
  }
};