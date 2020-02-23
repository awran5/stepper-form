const labels = ["First Step", "Second Step", "Last Step"]
const progress = document.getElementById("progress")
const form = document.getElementById("form")
let steps = 0
let formValue = {
  firstname: "",
  lastname: "",
  phone: "",
  gender: "",
  email: "",
  message: ""
}

for (let i = 0; i < labels.length; i++) {
  progress.innerHTML += `<li>${labels[i]}</li>`
}

progress.children[steps].classList.add("active")

handleSteps(steps)

function handleBack() {
  if (steps < labels.length) {
    progress.children[steps].classList.remove("active")
    steps--
    handleSteps(steps)
  }
}

form.addEventListener("change", e => {
  const { name, value } = e.target
  formValue = {
    ...formValue,
    [name]: value
  }
})

form.addEventListener("submit", e => {
  e.preventDefault()

  if (steps === labels.length - 1) {
    e.target.submit.setAttribute("disabled", true)
    document.getElementById("result").innerHTML = `
    <pre>${JSON.stringify(formValue, null, 2)}</pre>`
  } else {
    steps++
    progress.children[steps].classList.add("active")
    handleSteps(steps)
  }
})

function handleSteps(step) {
  const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1)

  const { firstname, lastname, phone, gender, email, message } = formValue

  switch (step) {
    case 0:
      return (form.innerHTML = `
        <div class="step">
          <div class="form-field">
            <input name="firstname" class="field" required value="${firstname}" placeholder="First Name (*)" />
            <span class="bar"></span>
          </div>
          <div class="form-field">
            <input name="lastname" class="field" placeholder="Last Name" value="${lastname}" />
            <span class="bar"></span>
          </div>
          <button type="submit" class="btn">Next</button>
        </div>`)
      break

    case 1:
      return (form.innerHTML = `
        <div class="step">
          <div class="form-field">
            <input name="phone" type="tel" class="field" value="${phone}" placeholder="Phone (*)" required />
            <span class="bar"></span>
          </div>
          <div class="form-field">
            <select name="gender" class="field" >
              <option value="${gender}"> ${gender ? capitalize(gender) : "Gender"}
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <button onclick="handleBack()" type="button" class="btn">Back</button>
          <button type="submit" class="btn">Next</button>
        </div>`)
      break

    case 2:
      return (form.innerHTML = `
        <div class="step">
          <div class="form-field">
            <input name="email" type="email" class="field" value="${email}" placeholder="Email" />
            <span class="bar"></span>
          </div>
          <div class="form-field">
            <textarea name="message" rows="4" class="field" placeholder="Additional information ..."></textarea>
            <span class="bar"></span></div>
          <button onclick="handleBack()" type="button" class="btn">Back</button>
          <button id="submit" type="submit" class="btn">Sumit</button>
        </div>`)
      break

    default:
      break
  }
}
