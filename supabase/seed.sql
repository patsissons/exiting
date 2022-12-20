insert into public.tags (name)
values
  ('test'),
  ('first'),
  ('second');

insert into public.exits (id, created_at, markdown, tags)
values
  ('34b2672f-5567-430e-95e5-d994689aa531', '2022-01-01 12:00:00+00', 'test exit 1', ARRAY['test', 'first']),
  ('7e3d4736-3a9b-4458-89ed-9f8d67c273c7', '2022-01-02 12:00:00+00', 'test exit 2', ARRAY['test', 'second']);

insert into public.exits (created_at, markdown)
values
  ('2022-01-03 12:00:00+00', 'test exit 3'),
  ('2022-01-04 12:00:00+00', 'test exit 4'),
  ('2022-01-05 12:00:00+00', 'test exit 5'),
  ('2022-01-06 12:00:00+00', 'test exit 6'),
  ('2022-01-07 12:00:00+00', 'test exit 7'),
  ('2022-01-08 12:00:00+00', 'test exit 8'),
  ('2022-01-09 12:00:00+00', 'test exit 9'),
  ('2022-01-10 12:00:00+00', 'test exit 10'),
  ('2022-01-11 12:00:00+00', 'test exit 11'),
  ('2022-01-12 12:00:00+00', 'test exit 12'),
  ('2022-01-13 12:00:00+00', 'test exit 13'),
  ('2022-01-14 12:00:00+00', 'test exit 14'),
  ('2022-01-15 12:00:00+00', 'test exit 15');

insert into public.exit_tags (exit_id, tag_id)
values
  ('34b2672f-5567-430e-95e5-d994689aa531', 1),
  ('34b2672f-5567-430e-95e5-d994689aa531', 2),
  ('7e3d4736-3a9b-4458-89ed-9f8d67c273c7', 1),
  ('7e3d4736-3a9b-4458-89ed-9f8d67c273c7', 3);
