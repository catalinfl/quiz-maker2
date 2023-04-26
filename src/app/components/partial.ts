export const setNumberFunc = (e: ChangeEvent<HTMLInputElement>) => {
    let questionsTempChar = e.target.value
    let questionsTempNum = parseInt(e.target.value)
    if (questionsTempChar.includes('e')) {
        numberInputRef.current!.value = "20"
        setQuestionsNumber(20)
    }
    if (questionsTempChar.length < 2 && questionsTempNum <= 20) {
        setQuestionsNumber(questionsTempNum)
    }
    if (questionsTempChar.length === 2 && questionsTempNum >= 20) {
        numberInputRef.current!.value = "20"
        setQuestionsNumber(20)
    }
    if (questionsTempChar.length > 2) {
        numberInputRef.current!.value = "20"
        setQuestionsNumber(20)
    }
}