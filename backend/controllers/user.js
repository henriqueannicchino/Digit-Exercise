bcrypt = require('bcryptjs');
jwt = require('jsonwebtoken');

dotenv = require('dotenv');
axios =require('axios');

dotenv.config();

module.exports = {
    async signin(req, res){
		const { username, password } = req.body;

        try{
            const existingUser = await findByUserName(username);

            if(!existingUser.length) return res.status(401).json({ message: "Invalid credentials. "});

            const isPasswordCorrect = await bcrypt.compare(password, existingUser[0].password);
            
            if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

            const token = jwt.sign({ name: existingUser[0].name, username: existingUser[0].username,  id: existingUser[0].id }, process.env.KEY, {expiresIn: "1h"});

            res.status(200).json({data: existingUser[0], token});
        } catch (error) {
            console.log({ error })
            res.status(500).json({ message: 'Something went wrong.' });
        }
	},

    async signup(req, res){
		const { username, password, firstName, lastName } = req.body;

        try{
            const existingUser = await findByUserName(username);

            if(existingUser.length) return res.status(400).json({ message: "User already exist. "});

            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = {
                name: `${firstName} ${lastName}`,
                username: username,
                password: hashedPassword,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }

            const result = await axios.post(`http://${process.env.JSON_SERVER_ADDRESS ?? "localhost"}:${process.env.DB_PORT ?? "8080"}/users`, newUser);

            const token = jwt.sign({ name: result.data.name, username: result.data.username, id: result.data.id }, process.env.KEY, {expiresIn: "1h"});

            res.status(200).json({data: result.data, token});
        } catch (error) {
            console.error({ error });
            res.status(500).json({ message: 'Something went wrong.' });
        }
	},

    

}

async function findByUserName(username){
    try {
        const response = await axios.get(`http://${process.env.JSON_SERVER_ADDRESS ?? "localhost"}:${process.env.DB_PORT ?? "8080"}/users?username=${username}`);

        return response.data;
        
    } catch (error){
        console.error({ error })
        res.status(500).json({ message: 'Something went wrong.' });
    }
}