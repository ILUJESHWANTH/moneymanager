import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails/index.jsx'
import TransactionItem from '../TransactionItem/index.jsx'
import './index.css'

const transactionTypeOptions = [
  {optionId: 'INCOME', displayText: 'Income'},
  {optionId: 'EXPENSES', displayText: 'Expenses'},
]

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
    transactionsList: [],
  }

  onChangeTitle = e => {
    console.log('title change:', e.target.value)
    this.setState({titleInput: e.target.value})
  }

  onChangeAmount = e => {
    console.log('amount change:', e.target.value)
    this.setState({amountInput: e.target.value})
  }

  onChangeOption = e => {
    console.log('type change:', e.target.value)
    this.setState({optionId: e.target.value})
  }

  onAddTransaction = e => {
    e.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    if (!titleInput || !amountInput) return

    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: optionId,
    }

    this.setState(prev => ({
      transactionsList: [...prev.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  deleteTransaction = id => {
    this.setState(prev => ({
      transactionsList: prev.transactionsList.filter(each => each.id !== id),
    }))
  }

  getTotals = () => {
    let income = 0
    let expenses = 0

    this.state.transactionsList.forEach(each => {
      if (each.type === 'INCOME') income += each.amount
      else expenses += each.amount
    })

    return {income, expenses, balance: income - expenses}
  }

  render() {
    const {titleInput, amountInput, optionId, transactionsList} = this.state
    const {income, expenses, balance} = this.getTotals()

    return (
      <div className="app-container">
        <div className="money-manager-container">
          <header className="header">
            <div>
              <h1 className="heading">Money Manager</h1>
              <p className="description">Track your income and expenses easily. <span className="span">Simple & clear</span></p>
            </div>
          </header>

          <MoneyDetails
            balance={balance}
            income={income}
            expenses={expenses}
          />

          <div className="bottom-section">
            <form className="form" onSubmit={this.onAddTransaction}>
              <h2 className="form-heading">Add Transaction</h2>

              <label className="label" htmlFor="title">TITLE</label>
              <input
                id="title"
                className="input"
                type="text"
                placeholder="e.g., Salary"
                value={titleInput}
                onChange={this.onChangeTitle}
              />

              <label className="label" htmlFor="amount">AMOUNT</label>
              <input
                id="amount"
                className="input"
                type="text"   /* MUST be text for tests */
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="e.g., 2500"
                value={amountInput}
                onChange={this.onChangeAmount}
                aria-label="amount"
              />

              <label className="label" htmlFor="type">TYPE</label>
              <select id="type" className="input" value={optionId} onChange={this.onChangeOption}>
                {transactionTypeOptions.map(each => (
                  <option key={each.optionId} value={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>

              <button className="add-btn" type="submit">Add</button>
            </form>

            <div className="history-container">
              <h2 className="history-heading">History</h2>
              <div className="transactions-header">
                <span className="header-text">Title</span>
                <span className="header-text">Amount</span>
                <span className="header-text">Type</span>
              </div>
              <ul className="transactions-list">
                {transactionsList.map(each => (
                  <TransactionItem
                    key={each.id}
                    transactionDetails={each}
                    deleteTransaction={this.deleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
