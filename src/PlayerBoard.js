import React, { useState } from 'react';
import Layout from './Components/Layout';
import Search from './Components/Search';
import Players from './Components/Players';


/**
 * PlayerBoard component represents the main board for displaying players and search functionality.
 * It manages the search state and renders the Layout, Search, and Players components.
 */
export default function PlayerBoard() {
  const [search, setSearch] = useState("");
  
  return (
    <Layout>
      <Search search={search} setSearch={setSearch} />
      <Players search={search} />
    </Layout>
  );
}
