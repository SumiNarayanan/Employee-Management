    import { Client, Account, Databases } from 'appwrite';

    const client = new Client()
    client.setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        client.setProject('64ae4bfc25c51e4ded9e');               // Your project ID

        export const account = new Account(client);

        //Databases

        export const databases = new Databases(client,"64ae4c7248d525f062c3");



        