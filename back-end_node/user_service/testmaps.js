const { getLatLng, findNearbyServices } = require('./maps');

// Replace with your actual JWT token from login
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzY2ZDJlYjY1ZTg5YjZlNjFlYmI5YyIsInVzZXJuYW1lIjoidGVzdGluZyIsImlhdCI6MTc0ODM5NzQxMCwiZXhwIjoxNzQ4NDgzODEwfQ.l1VtgYNJ0lAcrTCF9UXAlhlA2pypvwKUR43gdy6isak';

    (async () => {
    try {
        const address = 'Monas, Indonesia';
        const coords = await getLatLng(address);
        console.log('Coordinates:', coords);

        const services = await findNearbyServices(coords, 'fnb'); // replace with desired category
        console.log('Nearby Services:', services);
    } catch (err) {
        console.error('Test Error:', err.message);
    }
    })();
