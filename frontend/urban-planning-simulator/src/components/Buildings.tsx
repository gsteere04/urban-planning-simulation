import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Building {
    id: number;
    name: string;
    type: string;
}

const Buildings = () => {