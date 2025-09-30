const path = require('path');
const express = require('express');
const cors = require('cors');
const { Kafka } = require('kafkajs');


require('dotenv').config();
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve the client folder as static files
app.use(express.static(path.join(__dirname, '../client')));

// Kafka setup
const kafka = new Kafka({
  clientId: 'notification_group',
  brokers: ['kafka.bluecast.host:9092'],
});

const producer = kafka.producer();

// Connect Kafka producer
async function connectKafka() {
  await producer.connect();
  console.log('Kafka Producer connected');
}
connectKafka().catch(console.error);

// API endpoint to handle form submissions
app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }
   const kafkaEmailBody = {
  sender_email: process.env.EMAIL_USER,
  sender_password: process.env.EMAIL_PASS,
  receiver_email:process.env.DEFAULT_FROM,
   subject: `New message from ${name}`, // Subject includes user's name
    body: {
      type: "text",
      content: `
Hello Team,

You have received a new message from the website contact form.

Name: ${name}
Email: ${email}

Message:
${message}

Thanks
    ]
      `
    },
    // metadata: {
    //   templateId: "user_contact_form_v1",
    //   timestamp: new Date().toISOString()
    // }
  };
  try {
    await producer.send({
      topic: 'emails',
      messages: [
        { value: JSON.stringify(kafkaEmailBody) },
      ],
    });


    res.json({ message: 'Form data sent successfully!' });
  } catch (error) {
    console.error('Error sending to Kafka:', error);
    res.status(500).json({ message: 'Failed to send data to Kafka' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
