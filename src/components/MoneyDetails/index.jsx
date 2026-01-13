// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {balance, income, expenses} = props

  return (
    <section className="money-details-container" aria-label="money details">
      <div className="detail-item income">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
        />
        <div className="detail-text">
          <p className="label">Income</p>
          <p className="amount" data-testid="incomeAmount">Rs {income}</p>
        </div>
      </div>

      <div className="detail-item expenses">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
        />
        <div className="detail-text">
          <p className="label">Expenses</p>
          <p className="amount" data-testid="expensesAmount">Rs {expenses}</p>
        </div>
      </div>

      <div className="detail-item balance">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
        />
        <div className="detail-text">
          <p className="label">Balance</p>
          <p className="amount" data-testid="balanceAmount">Rs {balance}</p>
        </div>
      </div>
    </section>
  )
}

export default MoneyDetails
