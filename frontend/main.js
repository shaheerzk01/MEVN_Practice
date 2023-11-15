const API_URL = "http://localhost:3001/api";

new Vue({
    el: "#app",
    data: {
        formData: {
            name: '',
            email: '',
            skills: [],
            contactMethod: '',
            phoneNumber: '',
        },
        showSuccessMessage: false,
        skills: [
            { id: 1, name: 'HTML' },
            { id: 2, name: 'CSS' },
            { id: 3, name: 'JavaScript' },
            { id: 4, name: 'Vue.js' },
            { id: 5, name: 'React' },
            { id: 6, name: 'Angular' }
        ],
        isFormSubmitted: false
    },
    computed: {
        isNameValid(){
            return /^[a-zA-Z ]+$/.test(this.formData.name);
        },
        isEmailValid(){
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email);
        },
        isFormValid(){
            return this.isNameValid && this.isEmailValid;
        }
    },
    methods: {
        submitForm() {
            this.isFormSubmitted = true;
            console.log('Submit button clicked'); 
            console.log('Form data to be submitted:', this.formData);
            if (this.isFormValid) {
                axios.post(API_URL + "/submitForm", this.formData)
                .then(response => {
                    console.log('Form Data:', this.formData);
                    console.log('Response:', response.data);
    
                    // Show success message for 5 seconds
                    this.showSuccessMessage = true;
                    setTimeout(() => {
                        this.showSuccessMessage = false;
                        // Reload the page after 5 seconds
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                    }, 5000);
                })
                .catch(error => {
                    console.error('Error:', error);
                    this.isFormSubmitted = false;
                });
            } else {
                this.isFormSubmitted = false;
            }
        },
        refreshPage(){
            location.reload()
        }
    }
})

new Vue({
    el: "#app1",
    data: {
        users: []
    },
    mounted() {
        this.fetchUsers();
    },
    methods: {
        fetchUsers(){
            axios.get(API_URL + "/getInfo")
            .then(response => {
                this.users = response.data;
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            })
        },
        deleteUser(){
            const userId = this.users[index]._id;
            axios.delete(API_URL + "/deleteUser/${userId}")
            .then(response => {
                console.log('User deleted successfully:', response.data);
                this.users.splice(index, 1)
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            })
        }
    }
})
  
