import React, { useEffect, useState } from "react";
import "./DropDownMenu.scss";
const something = [
    {
        id: 1,
        main: "menu 1",
        open: false,
        options: [
            { menu: "menu1", path: "/abc" },
            { menu: "menu2", path: "/ijk" },
            { menu: "menu3", path: "" },
            { menu: "menu4", path: "" },
        ],
    },
    {
        id: 2,
        main: "menu 2",
        open: false,
        options: [
            { menu: "menu1", path: "/bcd" },
            { menu: "menu2", path: "" },
            { menu: "menu3", path: "" },
            { menu: "menu4", path: "" },
        ],
    },
    {
        id: 3,
        main: "menu 3",
        open: false,
        options: [
            { menu: "menu1", path: "/efg" },
            { menu: "menu2", path: "" },
            { menu: "menu3", path: "" },
            { menu: "menu4", path: "" },
        ],
    },
];

function DropDownMenu() {
    const [abc, setAbc] = useState(something);
    const path = window.location.pathname;

    useEffect(() => {
        const checkPath = () => {
            for (let p of something) {
                for (let i of p.options) {
                    if (i.path === path) {
                        return p.id;
                    }
                }
            }
        };
        let newArr = [...abc];
        const change = newArr.find((item) => item.id === checkPath());
        change.open = true;
        setAbc(newArr);
    }, []);

    const handleOpena = (index) => {
        const isOpen = abc.findIndex((item) => item.open === true);
        console.log(isOpen);
        let newArr = [...abc];
        newArr[index].open = true;
        if (isOpen !== -1) {
            newArr[isOpen].open = false;
        }
        setAbc(newArr);
    };

    return (
        <div>
            <div>
                {abc.map((item, index) => (
                    <div key={index}>
                        <h3
                            className="main-menu"
                            onClick={() => handleOpena(index)}
                        >
                            {item.main}
                        </h3>
                        <div className={`menu ${item.open ? "active" : " "}`}>
                            {item.options.map((opt, ind) => (
                                <p
                                    key={ind}
                                    className={
                                        opt.path === path ? "active" : ""
                                    }
                                >
                                    {opt.menu}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default DropDownMenu;
