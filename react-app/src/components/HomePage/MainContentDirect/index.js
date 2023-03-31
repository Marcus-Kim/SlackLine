import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"


function MainContentDirect() {
  const { dmId } = useParams(); //*
  const dms = useSelector(state => Object.values(state.directMessages.dms)); //*
  const selectedDm = dms.find((dm) => dm.id === parseInt(dmId)); //*
  

  return (
    <div className="home-content-container">
      <div className="home-content-header-container">{selectedDm.user2.username}</div>

    </div>
  )
}

export default MainContentDirect
