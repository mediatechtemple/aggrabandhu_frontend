'use client'
import React from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import useSortableData from './hooks/useSortableData';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
const MemberTable = ({members,openForm,columns}) => {


 

  

  // export default dataArray;
  
  const { items: sortedData, handleSort,getSortIcon } = useSortableData(members);


  return (
    <>
    <TableContainer  component={Paper} sx={{ mb: 2 }}>
      <Table>
        <TableHead>
        <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index} onClick={()=>handleSort(column.id)} sx={{backgroundColor:'#1976d2'}}>
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>{column.label}{column.id!=='actions' && getSortIcon(column.id)}</Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((member) => (
            <TableRow key={member['referenceId']}>
              {
                columns.map(column=>{
                return   column.id==='actions'? ( <TableCell key={column.id}>
                    <Button onClick={() => openForm(member)}>Edit</Button>
                  </TableCell>):
                  <TableCell key={column.id}>{typeof member[column.id]==='object' ? `${member[column.id]['name']}  (${member[column.id]['relationship']})`  : member[column.id]}</TableCell>
                })  
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default MemberTable;
