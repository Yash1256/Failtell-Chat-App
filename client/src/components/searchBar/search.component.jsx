import './search.style.css'
export const NavbarSearchBar = ()=>{
    return (
        <form className="userSearchForm">
            <input className="NavbarSearchBar" type="search" name="" id="" />
            <input className="submitBtn" type="submit" />
        </form>
    )
}

const searchKaro = (event)=>{
    var name = event.target.closest('.leftHeader').querySelector('.friend-filter').value.toLowerCase();
    var selectLeft = document.querySelectorAll('.LeftBlockUserCard');
    for(var i=0 ; i<selectLeft.length ; i++){
        if(!selectLeft[i].querySelector('.userName').textContent.toLowerCase().includes(name)){
            selectLeft[i].style.display = 'none';
        }else{
            selectLeft[i].style.display = 'block';
        }
    }
}

export const FriendFilter = ()=>{
    return(
        <div className="leftHeader">
            <input className="friend-filter" onChange={searchKaro} type="search" name="" id="" />
        </div>
   )
}