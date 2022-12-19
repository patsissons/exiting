import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { Exit } from "types";
// import {ApiResponse} from 'types'
// import {RegionModel, RegionRepository} from 'data'
// import {apiAction} from 'utils/api'

export interface ResponseData {
  exit: Exit;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Exit>
) {
  // return apiAction(req, res, 'create region').run<RegionModel>((input) =>
  //   RegionRepository.default.create(input),
  // )

  const supabase = createServerSupabaseClient<{ foo: {} }>({
    req,
    res,
  });

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession()
  const {} = await supabase.from("exits").upsert({});
}
