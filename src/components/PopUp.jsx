const PopUp = (props) => {
  const { show, close,children } = props;
  return (
    <>
      <div id="myPopup" className={`popup ${show ? "show" : ""}`}>
        <div className="popup-content">
          {children}
          <button id="closePopup" onClick={()=>close(false)}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};
export default PopUp;
