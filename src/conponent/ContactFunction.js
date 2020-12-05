async const getsinglecontact = (e) => {
    e.preventDefault();
    const contactIndexNumber = e.tartget.value;
    const url = `http://localhost:3001/customers/${contactIndexNumber}`;
    await fetch(url)
};