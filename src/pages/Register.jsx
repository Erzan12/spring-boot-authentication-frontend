export default function Register() {

    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            password: "",
            age: "",
            address: ""
        });

    const handleChange = (e) => {
        
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            
            await registerUser(formData);

            alert(
                "Registered Successfully"
            );

        } catch (error) {
            
            alert(
                error.response?.data?.message ||
                "Registration Failed"
            );
        }
    };

    return (
        <div>

            <h1>User Registration</h1>

            <form onSubmit={handleSubmit}>

                <input
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input 
                    type="password"
                    name="password"
                    placeholder="Password" 
                    onChange={handleChange}
                />

                <input 
                    name="age"
                    placeholder="Age"
                    onChange={handleChange} 
                />

                <input 
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                />

                <button type="submit">
                    Register
                </button>

            </form>
        </div>
    )
}