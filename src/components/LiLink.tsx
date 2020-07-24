import React, {FC} from 'react';
import {Link, NavLinkProps, Route} from "react-router-dom";

const LiLink : FC<NavLinkProps> = (props) => {
  let {exact, ...rest} = props;
  return (
    <Route path={props.to.toString()} exact={exact}>
      {({match}) => <li className={match ? 'active' : undefined}><Link {...rest}>{props.children}</Link></li>}
    </Route>
  );
};

export default LiLink;