insert into public.tags (name)
values
  ('test'),
  ('first'),
  ('second');

insert into public.exits (id, markdown, tags)
values
  (
'34b2672f-5567-430e-95e5-d994689aa531',
'# test exit 1

this is the first exit
', ARRAY['test', 'first']),
  (
'7e3d4736-3a9b-4458-89ed-9f8d67c273c7',
'# test exit 2

this is the second exit
', ARRAY['test', 'second']);

insert into public.exit_tags (exit_id, tag_id)
values
  ('34b2672f-5567-430e-95e5-d994689aa531', 1),
  ('34b2672f-5567-430e-95e5-d994689aa531', 2),
  ('7e3d4736-3a9b-4458-89ed-9f8d67c273c7', 1),
  ('7e3d4736-3a9b-4458-89ed-9f8d67c273c7', 3);
