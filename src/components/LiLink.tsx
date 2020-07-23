import React, {FC} from 'react';
import {Link, NavLinkProps, Route} from "react-router-dom";

const LiLink : FC<NavLinkProps> = (props) => {
  return (
    <Route path={props.to.toString()} exact={props.exact}>
      {({match}) => <li className={match ? 'active' : undefined}><Link {...props}>{props.children}</Link></li>}
    </Route>
  );
};

export default LiLink;