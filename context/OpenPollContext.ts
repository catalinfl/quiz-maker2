import { createContext, useState } from "react";

export var openPoll = false;

export const OpenPollContext = createContext<boolean>(openPoll);
