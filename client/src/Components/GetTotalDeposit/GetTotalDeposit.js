export const checkings = "Checkings"
export const savings = "Savings"
export const getTotalDeposit = (accounts, accountType) => {
    let total = 0

    accounts.forEach(account => {
        if(account.accountType === accountType){
            total += account.availableAmount + account.onDepositAmount
        }
    })

    return total
}