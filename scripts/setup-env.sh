
#!/bin/bash

# .env.local
if [ ! -r ".env.local" ] || [ "${1}" == "-f" ]; then
  pnpm run vercel env pull -y .env.local && \
  sed -i '' -e '/^VERCEL/d' .env.local && \
  pnpm run supabase status -o env --override-name api.url=SUPABASE_URL --override-name auth.service_role_key=SUPABASE_SERVICE_KEY | grep '^\(SUPABASE_URL\|SUPABASE_SERVICE_KEY\)' >> .env.local
fi
