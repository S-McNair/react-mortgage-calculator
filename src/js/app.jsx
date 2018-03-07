import React from 'react';

export default class App extends React.Component {
  // your Javascript goes here
  constructor(props) {
    super(props);
    this.state = {
      balance: undefined,
      rate: undefined,
      term: 15,
      month: undefined
    };

    this.handleChange = this.handleChange.bind(this);
    this.calculate = this.calculate.bind(this);
  }

handleChange(event){
  event.preventDefault();
  let name = event.target.name;
  let value  = event.target.value;
  this.setState({
    [name]: value,
  })
}

calculate(event){
  event.preventDefault();
  let principal = this.state.balance;
  let rate = (((this.state.rate)/100)/12);
  let length = (this.state.term * 12);
  let numerator = rate*(Math.pow((rate+1),length));
  let denominator = (Math.pow((rate+1),length)-1);
  var monthly = principal * (numerator/denominator);
  var payment = '$' + monthly.toFixed(2) + " is your monthly payment";

  console.log(length);
  console.log(payment);

  this.setState({
    month: payment
  })
}


  render() {
    const balance = this.state.balance;
    const rate = this.state.rate;
    const term = this.state.term;
    const payment = this.state.month;
    return (
      <div className='container'>
        <h2 className='text-center'>Mortgage Calculator</h2><br></br>
          <form>

            <div className='form-group row' >
              <label htmlFor='balance' className='col-sm-3 col-form-label'>Loan Balance:</label>
                <div className='col-sm-5' >
                  <input className='form-control form-control-lg' name='balance' type='number' value={balance} onChange={this.handleChange} placeholder='0'/>
              </div>
          </div>

          <div className= 'form-group row center'>
              <label htmlFor='rate' className='col-sm-3 col-form-label'>Interest Rate(%):</label>
                <div className='col-sm-5' >
                  <input className='form-control' name='rate' type='number' step='0.01' value={rate} onChange={this.handleChange} placeholder='0'/>
              </div>
          </div>

          <div className= 'form-group row' >
          <label htmlFor='term' className='col-sm-3 col-form-label'>Loan Term:</label>
            <div className='col-sm-5' >
                <select name='term' value={term} onChange={this.handleChange} className='form-control'>
                    <option >15</option>
                    <option >30</option>
                </select>
            </div>
          </div><br></br>

          <div >
            <button className='btn btn-info center-block' name='submit' onClick={this.calculate} >SUBMIT</button>
          </div><br></br>

          <div id='output'>
            <p className='text-center'>{payment}</p>
          </div>

          </form>

      </div>
    );
  }
}

