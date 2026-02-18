import './index.css';
import Stepper from './components/Stepper.jsx'

const CHECKOUT_STEPS = [
  {
    name: "Customer Info",
    Component : () => <div>Add contact details for further communications.</div>
  },

   {
    name: "Shipping Info",
    Component : () => <div>Add shipping address for successful delivery.</div>
  },

   {
    name: "Payment",
    Component : () => <div>Complete payment to complete the order.</div>
  },

   {
    name: "Ready to get delivered!",
    Component : () => <div>.</div>
  }
]
function App() {
  return (
  <div>
    <Stepper stepsConfig={CHECKOUT_STEPS}/>
  </div>
  )
}

export default App;