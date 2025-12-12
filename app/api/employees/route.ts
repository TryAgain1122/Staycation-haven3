import { createEdgeRouter } from 'next-connect';
import { NextRequest, NextResponse } from 'next/server';
import dbConnct from '@/backend/config/db'
import { createEmployee } from '@/backend/controller/employeeController';

interface RequestContext {};

const router = createEdgeRouter<NextRequest, RequestContext>();

router.post(createEmployee);

export async function POST (request: NextRequest, ctx: RequestContext):Promise<NextResponse> {
    return router.run(request, ctx) as Promise<NextResponse>
}