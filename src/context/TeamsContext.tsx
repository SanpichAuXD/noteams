"use client"
import { createContext, useContext, useState } from 'react';

interface TeamContextProps {
    name: string;
    description: string;
    image: string;
    }
const TeamContext = createContext<TeamContextProps>({
    name: 'Teams Name',
    description: 'Teams Description',
    image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
});

export const useTeamContext = () => {
    const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
}

export default function TeamsProvider({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <TeamContext.Provider value={{
        name: 'Teams Name',
        description: 'Teams Description',
        image: '"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"',
    }}>{children}</TeamContext.Provider>
  }