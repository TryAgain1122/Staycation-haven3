import { NextRequest, NextResponse } from 'next/server';
import pool from '../config/db';

export type EmployeeRole = 'Owner' | 'Csr' | 'Cleaner' | 'Partner';

export interface Employee {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  employment_id: string;
  hire_date: string;
  role: EmployeeRole;
  department?: string;
  monthly_salary?: number;
  street_address?: string;
  city?: string;
  zip_code?: string;
  created_at?: string;
  updated_at?: string;
}

// /api/employees/route.ts
export const createEmployee = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const body = await req.json();
    const {
      first_name,
      last_name,
      email,
      phone,
      employment_id,
      hire_date,
      role,
      department,
      monthly_salary,
      street_address,
      city,
      zip_code,
    } = body;

    const query = `
      INSERT INTO employees (
        first_name, last_name, email, phone, employment_id,
        hire_date, role, department, monthly_salary,
        street_address, city, zip_code
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `;

    const values = [
      first_name,
      last_name,
      email,
      phone,
      employment_id,
      hire_date,
      role,
      department,
      monthly_salary,
      street_address,
      city,
      zip_code,
    ];

    const result = await pool.query(query, values);
    console.log('✅ Employee Created:', result.rows[0]);

    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'Employee created successfully',
    }, { status: 201 });

  } catch (error: any) {
    console.log('❌ Error Creating employee:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to create employee',
    }, { status: 500 });
  }
};