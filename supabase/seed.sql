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

insert into public.exits (markdown)
values
  ('test exit 3'),
  ('test exit 4'),
  ('test exit 5'),
  ('test exit 6'),
  ('test exit 7'),
  ('test exit 8'),
  ('test exit 9'),
  ('test exit 10'),
  ('test exit 11'),
  ('test exit 12'),
  ('test exit 13'),
  ('test exit 14'),
  ('test exit 15');

insert into public.exit_tags (exit_id, tag_id)
values
  ('34b2672f-5567-430e-95e5-d994689aa531', 1),
  ('34b2672f-5567-430e-95e5-d994689aa531', 2),
  ('7e3d4736-3a9b-4458-89ed-9f8d67c273c7', 1),
  ('7e3d4736-3a9b-4458-89ed-9f8d67c273c7', 3);
