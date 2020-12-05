
module.export = GetAll = () => {
    fetch("http://localhost:3001/customers")
        .then(data => data.json())
        .then(result => {
            this.setState({
                isLoading: true,
                contact: result
            })

        },
            (error) => {
                this.setState({
                    isLoading: true,
                    error
                })
            })

}
