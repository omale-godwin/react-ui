import React, { Component } from 'react';



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: false,
      contact: [],
      singleContactSHow: false,
      value: '',
      fname: '',
      lname: '',
      phone: ''

    }
    this.updating = this.updating.bind(this);
    this.editing = this.editing.bind(this);
    this.delete = this.delete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  editing(e) {
    console.log(e);
    this.setState({ value: e });
  }
  updating(e) {
    e = this.state.value;
    this.setState({ fname: this.state.fname, lname: this.state.lname, phone: this.state.phone });
    console.log(this.state)
    fetch(`http://localhost:3002/api/v1/${e}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fname: this.state.fname, lname: this.state.lname, phone: this.state.phone })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    window.location.reload(false);
  }
  delete(e) {

    const index = e;
    console.log(index)
    fetch(`http://localhost:3002/api/v1/${index}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    window.location.reload(false);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.setState({ fname: this.state.fname, lname: this.state.lname, phone: this.state.phone });
    console.log(this.state);
    fetch("http://localhost:3002/api/v1", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fname: this.state.fname, lname: this.state.lname, phone: this.state.phone })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    window.location.reload(false);
  }

  componentDidMount() {
    fetch("api:3001/api/v1")
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
    console.log(this.state.contact)

  };
  getsinglecontact(event) {
    this.setState({
      inputIndex: event.target.value,

    });
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
    console.log(this.state.value)
  }

  handleSubmit(event) {
    const showcontactindex = this.state.value;
    event.preventDefault();
    fetch(`api:3001/api/v1/${showcontactindex}`)
      .then(data => data.json())
      .then(result => {
        this.setState({
          isLoading: true,
          contact: result,
          singleContactSHow: true
        })

      },
        (error) => {
          this.setState({
            isLoading: true,
            error
          })
        })


  }


  render() {

    const { error, isLoading, contact, singleContactSHow } = this.state;
    if (error) {
      return (
        <div>error: error.message</div>
      )
    } else if (!isLoading) {
      return (
        <div className="text-center display-4 pt-5">......LOADING DATA ......PLEASE WAIT A BIT</div>
      )
    } else {

      if (singleContactSHow) {
        return (
          <div>
            <div>
              <meta charSet="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
              <title>lexclass contact form</title>
              <style dangerouslySetInnerHTML={{ __html: "\nbody {\n\tcolor: #566787;\n\tbackground: #f5f5f5;\n\tfont-family: 'Varela Round', sans-serif;\n\tfont-size: 13px;\n}\n.table-responsive {\n    margin: 30px 0;\n}\n.table-wrapper {\n\tbackground: #fff;\n\tpadding: 20px 25px;\n\tborder-radius: 3px;\n\tmin-width: 1000px;\n\tbox-shadow: 0 1px 1px rgba(0,0,0,.05);\n}\n.table-title {        \n\tpadding-bottom: 15px;\n\tbackground: #435d7d;\n\tcolor: #fff;\n\tpadding: 16px 30px;\n\tmin-width: 100%;\n\tmargin: -20px -25px 10px;\n\tborder-radius: 3px 3px 0 0;\n}\n.table-title h2 {\n\tmargin: 5px 0 0;\n\tfont-size: 24px;\n}\n.table-title .btn-group {\n\tfloat: right;\n}\n.table-title .btn {\n\tcolor: #fff;\n\tfloat: right;\n\tfont-size: 13px;\n\tborder: none;\n\tmin-width: 50px;\n\tborder-radius: 2px;\n\tborder: none;\n\toutline: none !important;\n\tmargin-left: 10px;\n}\n.table-title .btn i {\n\tfloat: left;\n\tfont-size: 21px;\n\tmargin-right: 5px;\n}\n.table-title .btn span {\n\tfloat: left;\n\tmargin-top: 2px;\n}\ntable.table tr th, table.table tr td {\n\tborder-color: #e9e9e9;\n\tpadding: 12px 15px;\n\tvertical-align: middle;\n}\ntable.table tr th:first-child {\n\twidth: 60px;\n}\ntable.table tr th:last-child {\n\twidth: 100px;\n}\ntable.table-striped tbody tr:nth-of-type(odd) {\n\tbackground-color: #fcfcfc;\n}\ntable.table-striped.table-hover tbody tr:hover {\n\tbackground: #f5f5f5;\n}\ntable.table th i {\n\tfont-size: 13px;\n\tmargin: 0 5px;\n\tcursor: pointer;\n}\t\ntable.table td:last-child i {\n\topacity: 0.9;\n\tfont-size: 22px;\n\tmargin: 0 5px;\n}\ntable.table td a {\n\tfont-weight: bold;\n\tcolor: #566787;\n\tdisplay: inline-block;\n\ttext-decoration: none;\n\toutline: none !important;\n}\ntable.table td a:hover {\n\tcolor: #2196F3;\n}\ntable.table td a.edit {\n\tcolor: #FFC107;\n}\ntable.table td a.delete {\n\tcolor: #F44336;\n}\ntable.table td i {\n\tfont-size: 19px;\n}\ntable.table .avatar {\n\tborder-radius: 50%;\n\tvertical-align: middle;\n\tmargin-right: 10px;\n}\n.pagination {\n\tfloat: right;\n\tmargin: 0 0 5px;\n}\n.pagination li a {\n\tborder: none;\n\tfont-size: 13px;\n\tmin-width: 30px;\n\tmin-height: 30px;\n\tcolor: #999;\n\tmargin: 0 2px;\n\tline-height: 30px;\n\tborder-radius: 2px !important;\n\ttext-align: center;\n\tpadding: 0 6px;\n}\n.pagination li a:hover {\n\tcolor: #666;\n}\t\n.pagination li.active a, .pagination li.active a.page-link {\n\tbackground: #03A9F4;\n}\n.pagination li.active a:hover {        \n\tbackground: #0397d6;\n}\n.pagination li.disabled i {\n\tcolor: #ccc;\n}\n.pagination li i {\n\tfont-size: 16px;\n\tpadding-top: 6px\n}\n.hint-text {\n\tfloat: left;\n\tmargin-top: 10px;\n\tfont-size: 13px;\n}    \n/* Custom checkbox */\n.custom-checkbox {\n\tposition: relative;\n}\n.custom-checkbox input[type=\"checkbox\"] {    \n\topacity: 0;\n\tposition: absolute;\n\tmargin: 5px 0 0 3px;\n\tz-index: 9;\n}\n.custom-checkbox label:before{\n\twidth: 18px;\n\theight: 18px;\n}\n.custom-checkbox label:before {\n\tcontent: '';\n\tmargin-right: 10px;\n\tdisplay: inline-block;\n\tvertical-align: text-top;\n\tbackground: white;\n\tborder: 1px solid #bbb;\n\tborder-radius: 2px;\n\tbox-sizing: border-box;\n\tz-index: 2;\n}\n.custom-checkbox input[type=\"checkbox\"]:checked + label:after {\n\tcontent: '';\n\tposition: absolute;\n\tleft: 6px;\n\ttop: 3px;\n\twidth: 6px;\n\theight: 11px;\n\tborder: solid #000;\n\tborder-width: 0 3px 3px 0;\n\ttransform: inherit;\n\tz-index: 3;\n\ttransform: rotateZ(45deg);\n}\n.custom-checkbox input[type=\"checkbox\"]:checked + label:before {\n\tborder-color: #03A9F4;\n\tbackground: #03A9F4;\n}\n.custom-checkbox input[type=\"checkbox\"]:checked + label:after {\n\tborder-color: #fff;\n}\n.custom-checkbox input[type=\"checkbox\"]:disabled + label:before {\n\tcolor: #b8b8b8;\n\tcursor: auto;\n\tbox-shadow: none;\n\tbackground: #ddd;\n}\n/* Modal styles */\n.modal .modal-dialog {\n\tmax-width: 400px;\n}\n.modal .modal-header, .modal .modal-body, .modal .modal-footer {\n\tpadding: 20px 30px;\n}\n.modal .modal-content {\n\tborder-radius: 3px;\n\tfont-size: 14px;\n}\n.modal .modal-footer {\n\tbackground: #ecf0f1;\n\tborder-radius: 0 0 3px 3px;\n}\n.modal .modal-title {\n\tdisplay: inline-block;\n}\n.modal .form-control {\n\tborder-radius: 2px;\n\tbox-shadow: none;\n\tborder-color: #dddddd;\n}\n.modal textarea.form-control {\n\tresize: vertical;\n}\n.modal .btn {\n\tborder-radius: 2px;\n\tmin-width: 100px;\n}\t\n.modal form label {\n\tfont-weight: normal;\n}\t\n" }} />
              <div className="container-xl">
                <div className="table-responsive">
                  <div className="table-wrapper">
                    <div className="table-title">
                      <div className="row">
                        <div className="col-sm-6">
                          <h2>Contact <b>Form</b></h2>
                        </div>
                        <div className="col-sm-6">
                          <a href="#addEmployeeModal" className="btn btn-success" data-toggle="modal"><i className="material-icons"></i> <span>Add New Contact</span></a>

                          <form onSubmit={this.handleSubmit}>
                            <label>
                              index number:
                              <input type="text" value={this.state.value} onChange={this.handleChange} />
                            </label>
                            <input type="submit" value="Submit" />
                          </form>
                        </div>
                      </div>
                    </div>
                    <table className="table table-striped table-hover">

                      <thead>
                        <tr>
                          <th>
                            id
                          </th>
                          <th>First Name</th>
                          <th>Last Name</th>

                          <th>Phone</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>


                        return (
                            <tr key={contact.id}>
                          <td>
                            {contact.id}
                          </td>
                          <td>{contact.fname}</td>
                          <td>{contact.lname}</td>
                          <td>{contact.phone}</td>
                          <td>
                            <a href="#editEmployeeModal" className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit"></i></a>
                            <a href="#deleteEmployeeModal" className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete"></i></a>
                          </td>
                        </tr>
                          )

                      </tbody>
                    </table>
                    <div className="clearfix">
                      <div className="hint-text">Showing <b>1</b> out of <b>2</b> entries</div>
                      <ul className="pagination">


                        <li className="page-item active"><button className="btn page-link">1</button></li>
                        <li className="page-item"><button className="ntm page-link">2</button></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div id="addEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <form>
                      <div className="modal-header">
                        <h4 className="modal-title">Add New Contact</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                      </div>
                      <div className="modal-body">
                        <div className="form-group">
                          <label>First Name</label>
                          <input type="text" className="form-control" required value={this.state.fname} onChange={e => this.setState({ fname: e.target.value })} />
                        </div>

                        <div className="form-group">
                          <label>LastName</label>
                          <input type="text" className="form-control" required value={this.state.lname} onChange={e => this.setState({ lname: e.target.value })} />
                        </div>
                        <div className="form-group">
                          <label>Phone</label>
                          <input type="text" className="form-control" required value={this.state.phone} onChange={e => this.setState({ phone: e.target.value })} />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <input type="button" className="btn btn-default" data-dismiss="modal" defaultValue="Cancel" />
                        <input type="submit" onClick={e => this.handleFormSubmit(e)} className="btn btn-success" defaultValue="Add" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div id="editEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <form>
                      <div className="modal-header">
                        <h4 className="modal-title">Edit Contact</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                      </div>
                      <div className="modal-body">
                        <div className="form-group">
                          <label>First Name</label>
                          <input type="text" className="form-control" required value={this.state.fname} onChange={e => this.setState({ fname: e.target.value })} />
                        </div>
                        <div className="form-group">
                          <label>Last Name</label>
                          <input type="email" className="form-control" required value={this.state.lname} onChange={e => this.setState({ lname: e.target.value })} />
                        </div>

                        <div className="form-group">
                          <label>Phone</label>
                          <input type="text" className="form-control" required value={this.state.phone} onChange={e => this.setState({ phone: e.target.value })} />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <input type="button" className="btn btn-default" data-dismiss="modal" defaultValue="Cancel" />
                        <input type="submit" className="btn btn-info" defaultValue="Save" onClick={e => this.updating(e)} />
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div id="deleteEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <form>
                      <div className="modal-header">
                        <h4 className="modal-title">Delete Contact</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                      </div>
                      <div className="modal-body">
                        <p>Are you sure you want to delete these Records?</p>
                        <p className="text-warning"><small>This action cannot be undone.</small></p>
                      </div>
                      <div className="modal-footer">
                        <input type="button" className="btn btn-default" data-dismiss="modal" defaultValue="Cancel" />
                        <input type="submit" className="btn btn-danger" defaultValue="Delete" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>


          </div>
        )

      } else {
        return (
          <div>
            <div>
              <meta charSet="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
              <title>lexclass contact form</title>
              <style dangerouslySetInnerHTML={{ __html: "\nbody {\n\tcolor: #566787;\n\tbackground: #f5f5f5;\n\tfont-family: 'Varela Round', sans-serif;\n\tfont-size: 13px;\n}\n.table-responsive {\n    margin: 30px 0;\n}\n.table-wrapper {\n\tbackground: #fff;\n\tpadding: 20px 25px;\n\tborder-radius: 3px;\n\tmin-width: 1000px;\n\tbox-shadow: 0 1px 1px rgba(0,0,0,.05);\n}\n.table-title {        \n\tpadding-bottom: 15px;\n\tbackground: #435d7d;\n\tcolor: #fff;\n\tpadding: 16px 30px;\n\tmin-width: 100%;\n\tmargin: -20px -25px 10px;\n\tborder-radius: 3px 3px 0 0;\n}\n.table-title h2 {\n\tmargin: 5px 0 0;\n\tfont-size: 24px;\n}\n.table-title .btn-group {\n\tfloat: right;\n}\n.table-title .btn {\n\tcolor: #fff;\n\tfloat: right;\n\tfont-size: 13px;\n\tborder: none;\n\tmin-width: 50px;\n\tborder-radius: 2px;\n\tborder: none;\n\toutline: none !important;\n\tmargin-left: 10px;\n}\n.table-title .btn i {\n\tfloat: left;\n\tfont-size: 21px;\n\tmargin-right: 5px;\n}\n.table-title .btn span {\n\tfloat: left;\n\tmargin-top: 2px;\n}\ntable.table tr th, table.table tr td {\n\tborder-color: #e9e9e9;\n\tpadding: 12px 15px;\n\tvertical-align: middle;\n}\ntable.table tr th:first-child {\n\twidth: 60px;\n}\ntable.table tr th:last-child {\n\twidth: 100px;\n}\ntable.table-striped tbody tr:nth-of-type(odd) {\n\tbackground-color: #fcfcfc;\n}\ntable.table-striped.table-hover tbody tr:hover {\n\tbackground: #f5f5f5;\n}\ntable.table th i {\n\tfont-size: 13px;\n\tmargin: 0 5px;\n\tcursor: pointer;\n}\t\ntable.table td:last-child i {\n\topacity: 0.9;\n\tfont-size: 22px;\n\tmargin: 0 5px;\n}\ntable.table td a {\n\tfont-weight: bold;\n\tcolor: #566787;\n\tdisplay: inline-block;\n\ttext-decoration: none;\n\toutline: none !important;\n}\ntable.table td a:hover {\n\tcolor: #2196F3;\n}\ntable.table td a.edit {\n\tcolor: #FFC107;\n}\ntable.table td a.delete {\n\tcolor: #F44336;\n}\ntable.table td i {\n\tfont-size: 19px;\n}\ntable.table .avatar {\n\tborder-radius: 50%;\n\tvertical-align: middle;\n\tmargin-right: 10px;\n}\n.pagination {\n\tfloat: right;\n\tmargin: 0 0 5px;\n}\n.pagination li a {\n\tborder: none;\n\tfont-size: 13px;\n\tmin-width: 30px;\n\tmin-height: 30px;\n\tcolor: #999;\n\tmargin: 0 2px;\n\tline-height: 30px;\n\tborder-radius: 2px !important;\n\ttext-align: center;\n\tpadding: 0 6px;\n}\n.pagination li a:hover {\n\tcolor: #666;\n}\t\n.pagination li.active a, .pagination li.active a.page-link {\n\tbackground: #03A9F4;\n}\n.pagination li.active a:hover {        \n\tbackground: #0397d6;\n}\n.pagination li.disabled i {\n\tcolor: #ccc;\n}\n.pagination li i {\n\tfont-size: 16px;\n\tpadding-top: 6px\n}\n.hint-text {\n\tfloat: left;\n\tmargin-top: 10px;\n\tfont-size: 13px;\n}    \n/* Custom checkbox */\n.custom-checkbox {\n\tposition: relative;\n}\n.custom-checkbox input[type=\"checkbox\"] {    \n\topacity: 0;\n\tposition: absolute;\n\tmargin: 5px 0 0 3px;\n\tz-index: 9;\n}\n.custom-checkbox label:before{\n\twidth: 18px;\n\theight: 18px;\n}\n.custom-checkbox label:before {\n\tcontent: '';\n\tmargin-right: 10px;\n\tdisplay: inline-block;\n\tvertical-align: text-top;\n\tbackground: white;\n\tborder: 1px solid #bbb;\n\tborder-radius: 2px;\n\tbox-sizing: border-box;\n\tz-index: 2;\n}\n.custom-checkbox input[type=\"checkbox\"]:checked + label:after {\n\tcontent: '';\n\tposition: absolute;\n\tleft: 6px;\n\ttop: 3px;\n\twidth: 6px;\n\theight: 11px;\n\tborder: solid #000;\n\tborder-width: 0 3px 3px 0;\n\ttransform: inherit;\n\tz-index: 3;\n\ttransform: rotateZ(45deg);\n}\n.custom-checkbox input[type=\"checkbox\"]:checked + label:before {\n\tborder-color: #03A9F4;\n\tbackground: #03A9F4;\n}\n.custom-checkbox input[type=\"checkbox\"]:checked + label:after {\n\tborder-color: #fff;\n}\n.custom-checkbox input[type=\"checkbox\"]:disabled + label:before {\n\tcolor: #b8b8b8;\n\tcursor: auto;\n\tbox-shadow: none;\n\tbackground: #ddd;\n}\n/* Modal styles */\n.modal .modal-dialog {\n\tmax-width: 400px;\n}\n.modal .modal-header, .modal .modal-body, .modal .modal-footer {\n\tpadding: 20px 30px;\n}\n.modal .modal-content {\n\tborder-radius: 3px;\n\tfont-size: 14px;\n}\n.modal .modal-footer {\n\tbackground: #ecf0f1;\n\tborder-radius: 0 0 3px 3px;\n}\n.modal .modal-title {\n\tdisplay: inline-block;\n}\n.modal .form-control {\n\tborder-radius: 2px;\n\tbox-shadow: none;\n\tborder-color: #dddddd;\n}\n.modal textarea.form-control {\n\tresize: vertical;\n}\n.modal .btn {\n\tborder-radius: 2px;\n\tmin-width: 100px;\n}\t\n.modal form label {\n\tfont-weight: normal;\n}\t\n" }} />
              <div className="container-xl">
                <div className="table-responsive">
                  <div className="table-wrapper">
                    <div className="table-title">
                      <div className="row">
                        <div className="col-sm-6">
                          <h2>Contact <b>Form</b></h2>
                        </div>
                        <div className="col-sm-6">
                          <a href="#addEmployeeModal" className="btn btn-success" data-toggle="modal"><i className="material-icons"></i> <span>Add New Contact</span></a>

                          <form onSubmit={this.handleSubmit}>
                            <label>
                              index number:
                              <input type="text" value={this.state.value} onChange={this.handleChange} />
                            </label>
                            <input type="submit" value="Submit" />
                          </form>
                        </div>
                      </div>
                    </div>
                    <table className="table table-striped table-hover">

                      <thead>
                        <tr>
                          <th>
                            id
                          </th>
                          <th>First Name</th>
                          <th>Last Name</th>

                          <th>Phone</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>

                        {contact.map(cont => {
                          return (
                            <tr key={cont.id}>
                              <td>
                                {cont.id}
                              </td>
                              <td>{cont.fname}</td>
                              <td>{cont.lname}</td>
                              <td>{cont.phone}</td>
                              <td>
                                <li></li>
                                <a href="#editEmployeeModal" onClick={this.editing.bind(this, cont.id)} className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit"></i></a>
                                <button className="btn danger" onClick={this.delete.bind(this, cont.id)} > <i className="material-icons" data-toggle="tooltip" title="Delete"></i> </button>       </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                    <div className="clearfix">
                      <div className="hint-text">Showing <b>1</b> out of <b>2</b> entries</div>
                      <ul className="pagination">


                        <li className="page-item active"><button className="btn page-link">1</button></li>
                        <li className="page-item"><button className="ntm page-link">2</button></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div id="addEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <form>
                      <div className="modal-header">
                        <h4 className="modal-title">Add New Contact</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                      </div>
                      <div className="modal-body">
                        <div className="form-group">
                          <label>First Name</label>
                          <input type="text" className="form-control" required value={this.state.fname} onChange={e => this.setState({ fname: e.target.value })} />
                        </div>

                        <div className="form-group">
                          <label>LastName</label>
                          <input type="text" className="form-control" required value={this.state.lname} onChange={e => this.setState({ lname: e.target.value })} />
                        </div>
                        <div className="form-group">
                          <label>Phone</label>
                          <input type="text" className="form-control" required value={this.state.phone} onChange={e => this.setState({ phone: e.target.value })} />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <input type="button" className="btn btn-default" data-dismiss="modal" defaultValue="Cancel" />
                        <input type="submit" onClick={e => this.handleFormSubmit(e)} className="btn btn-success" defaultValue="Add" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div id="editEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <form>
                      <div className="modal-header">
                        <h4 className="modal-title">Edit Contact</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                      </div>
                      <div className="modal-body">
                        <div className="form-group">
                          <label>First Name</label>
                          <input type="text" className="form-control" required value={this.state.fname} onChange={e => this.setState({ fname: e.target.value })} />
                        </div>
                        <div className="form-group">
                          <label>Last Name</label>
                          <input type="email" className="form-control" required value={this.state.lname} onChange={e => this.setState({ lname: e.target.value })} />
                        </div>

                        <div className="form-group">
                          <label>Phone</label>
                          <input type="text" className="form-control" required value={this.state.phone} onChange={e => this.setState({ phone: e.target.value })} />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <input type="button" className="btn btn-default" data-dismiss="modal" defaultValue="Cancel" />
                        <input type="submit" className="btn btn-info" defaultValue="Save" onClick={e => this.updating(e)} />
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div id="deleteEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <form>
                      <div className="modal-header">
                        <h4 className="modal-title">Delete Contact</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                      </div>
                      <div className="modal-body">
                        <p>Are you sure you want to delete these Records?</p>
                        <p className="text-warning"><small>This action cannot be undone.</small></p>
                      </div>
                      <div className="modal-footer">
                        <input type="button" className="btn btn-default" data-dismiss="modal" defaultValue="Cancel" />
                        <input type="submit" className="btn btn-danger" defaultValue="Delete" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>


          </div>
        )
      }
    }
  }
}
