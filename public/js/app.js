

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
//the following html elements are selected use id attached to the paragraphs using #
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')



weatherform.addEventListener('submit', (event)=> {
    event.preventDefault()

    const location = search.value
    console.log(location)

    message1.textContent = 'Loading ....'

    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data) => {
            if (data.error){
                console.log(data.error)
                message1.textContent = data.error
            } else {
                console.log(data)
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
   
    })
})


