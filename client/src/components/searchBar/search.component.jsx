import './search.style.css'
export const NavbarSearchBar = ()=>{
    return (
        <form className="userSearchForm">
            <input className="NavbarSearchBar" type="search" name="" id="" />
            <input className="submitBtn" type="submit" />
        </form>
    )
}
export const FriendFilter = ()=>{
    return(
        <div className="leftHeader">
            <input className="friend-filter" type="search" name="" id="" />
        </div>
   )
    
}