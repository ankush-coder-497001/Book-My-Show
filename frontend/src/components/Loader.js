
import './Loader.css'
const Loader = ()=>{
  return(
    <>
    <div class="main-div">
      <div class="loader">
        <div class="ticket-hole ticket-hole-left"></div>
        <div class="ticket-hole ticket-hole-right"></div>
        <div class="ticket-content">
            <div class="ticket-title">Loading</div>
            <div class="ticket-subtitle">Please wait...</div>
        </div>
    </div>
    </div>
    </>
  )
}

export default Loader;