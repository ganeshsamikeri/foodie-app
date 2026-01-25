import React, { useRef } from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {
  const listRef = useRef(null);

  const scroll = (direction) => {
    if (listRef.current) {
        const { scrollLeft, clientWidth } = listRef.current;
        const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
        listRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className='explore-menu' id='explore-menu'>
        <div className="section-header">
            <h2>What's on your mind?</h2>
            <div className="scroll-controls">
                <span onClick={() => scroll("left")}>←</span>
                <span onClick={() => scroll("right")}>→</span>
            </div>
        </div>
        <p className='explore-menu-test'>Choose from a diverse menu featuring a delectable array of dishes.</p>
        <div className="explore-menu-list" ref={listRef}>
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className={`explore-menu-list-item ${category===item.menu_name?"active-text":""}`}>
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default ExploreMenu