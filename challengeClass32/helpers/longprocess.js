process.on('message', (amount)=> {
    let contador = 1
    const randomNumbers = []
    const sortedNumbers = []
    const arrayCount = []
    const response = {}

    for(let i = 0; i < amount; i++) {
        const n = Math.floor(Math.random() * 1000 + 1)
        randomNumbers.push(n)
    }
    randomNumbers.sort()
    for(let i = 0; i < randomNumbers.length; i++) {
        if(randomNumbers[i] == randomNumbers[i + 1]) {
            contador++
        } else {
            arrayCount.push(contador)
            sortedNumbers.push(randomNumbers[i])
            contador = 1
        }
    }
    for(let i = 0; i < sortedNumbers.length; i++) {
        response[`${sortedNumbers[i]}`] = arrayCount[i]
    }

    process.send(response)
})