import React from "react";

class AddContact extends React.Component {
  /**
   * all variables stored in this state.
   */
  state = {
    name: "",
    email: "",
  };

  /**
   * @param {*} e 
   * @returns 
   */
  add = (e) => {
    e.preventDefault();
    // jika variable name dan email kosong maka berikan sebuah alert dan hentikan.
    if (this.state.name === "" || this.state.email === "") {
      alert("ALl the fields are mandatory!");
      return;
    }

    /**
     * put all the variables in state to props addContactHandler function that been given by App.js.
     */
    this.props.addContactHandler(this.state);
    
    this.setState({ name: "", email: "" });
    // push the props into route "/".
    this.props.history.push("/");
  };
  
  /**
   * render all jsx files.
   * @returns 
   */
  render() {
    return (
      <div className="ui main">
        <h2>Add Contact</h2>
        {/* 
          after form submitted it will run ad function 
        */}
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Name</label>
            {/* 
              input get the value set it to state.name variable.
              then onChange set the state to the new one.
            */}
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Email</label>
            {/* 
              input get the value set it to state.email variable.
              then onChange set the state to the new one.
            */}
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          {/* 
            button to submit the form with the value that we fill inside the input fields.
            that will change with the name="name" and name="email"
          */}
          <button className="ui button blue">Add</button>
        </form>
      </div>
    );
  }
}

export default AddContact;
