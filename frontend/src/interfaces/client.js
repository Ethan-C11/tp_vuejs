const clientAddressInterface = {
  address1: "",
  address2: "",
  postCode: "",
  city: "",
  country: ""
}

const clientInterface = {
  id: Date.now(),
  firstName: "",
  lastName: "",
  companyName: "",
  date: new Date().toISOString().slice(0, 10),
  function: "",
  email: "",
  address: {...clientAddressInterface},
  phone : ""
}



export { clientInterface, clientAddressInterface }
