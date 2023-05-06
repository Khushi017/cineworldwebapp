import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Appstate } from "../App";

const Header = () => {
  const useAppstate = useContext(Appstate);

  return (
    <div className="header sticky z-10 bg-gray-900 top-0 text-5xl flex justify-between font-bold items-center p-3 border-b-2 border-grey-600 text-purple-600">
      <Link to={'/'}>
      <span>
        Cine<span className="text-white">World</span>
      </span>
      </Link>

      {useAppstate.login ? 
      <Link to={'/addmovie'}>
      <h1 className="text-2xl flex items-center cursor-pointer">
        <Button>
          <span className="text-white">
            <AddIcon className="mr-1" /> Add New
          </span>
        </Button>
      </h1>
      </Link>
      :
      <Link to={'/login'}>
      <h1 className="text-2xl flex items-center cursor-pointer bg-purple-900 border-0 px-1 focus:outline-none hover:bg-purple-700 rounded-xl">
        <Button>
          <span className="text-white">
            Login
          </span>
        </Button>
      </h1>
      </Link>
      }
    </div>
  );
};

export default Header;
