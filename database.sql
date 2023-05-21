-- Table: public.admin

-- DROP TABLE IF EXISTS public.admin;

CREATE TABLE IF NOT EXISTS public.admin
(
    admin_id integer NOT NULL DEFAULT nextval('admin_admin_id_seq'::regclass),
    admin_email character varying(50) COLLATE pg_catalog."default" NOT NULL,
    admin_password character varying(150) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT admin_pkey PRIMARY KEY (admin_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.admin
    OWNER to postgres;

-- Table: public.campaign

-- DROP TABLE IF EXISTS public.campaign;

CREATE TABLE IF NOT EXISTS public.campaign
(
    campaign_id integer NOT NULL DEFAULT nextval('campaign_campaign_id_seq'::regclass),
    campaign_title character varying(50) COLLATE pg_catalog."default" NOT NULL,
    campaign_description text COLLATE pg_catalog."default" NOT NULL,
    campaign_start_time timestamp without time zone NOT NULL,
    campaign_end_time timestamp without time zone NOT NULL,
    campaign_type character varying(50) COLLATE pg_catalog."default" NOT NULL,
    campaign_image text COLLATE pg_catalog."default" NOT NULL,
    campaigner_id integer,
    campaign_goal integer,
    campaign_earning integer NOT NULL DEFAULT 0,
    campaign_status boolean NOT NULL DEFAULT false,
    CONSTRAINT campaign_pkey PRIMARY KEY (campaign_id),
    CONSTRAINT campaign_campaigner_id_fkey FOREIGN KEY (campaigner_id)
        REFERENCES public.campaigner (campaigner_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.campaign
    OWNER to postgres;


-- Table: public.campaign_equity

-- DROP TABLE IF EXISTS public.campaign_equity;

CREATE TABLE IF NOT EXISTS public.campaign_equity
(
    campaign_equity_id integer NOT NULL DEFAULT nextval('campaign_equity_campaign_equity_id_seq'::regclass),
    campaign_id integer NOT NULL,
    campaign_equity_percentage integer NOT NULL,
    campaign_equity_amount integer NOT NULL,
    campaign_equity_description text COLLATE pg_catalog."default",
    CONSTRAINT campaign_equity_pkey PRIMARY KEY (campaign_equity_id),
    CONSTRAINT campaign_equity_campaign_id_fkey FOREIGN KEY (campaign_id)
        REFERENCES public.campaign (campaign_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.campaign_equity
    OWNER to postgres;


-- Table: public.campaign_profit

-- DROP TABLE IF EXISTS public.campaign_profit;

CREATE TABLE IF NOT EXISTS public.campaign_profit
(
    campaign_profit_id integer NOT NULL DEFAULT nextval('campaign_profit_campaign_profit_id_seq'::regclass),
    campaign_id integer NOT NULL,
    campaign_profit_percentage integer NOT NULL,
    CONSTRAINT campaign_profit_pkey PRIMARY KEY (campaign_profit_id),
    CONSTRAINT campaign_profit_campaign_id_fkey FOREIGN KEY (campaign_id)
        REFERENCES public.campaign (campaign_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.campaign_profit
    OWNER to postgres;


-- Table: public.campaign_reward

-- DROP TABLE IF EXISTS public.campaign_reward;

CREATE TABLE IF NOT EXISTS public.campaign_reward
(
    campaign_reward_id integer NOT NULL DEFAULT nextval('campaign_reward_campaign_reward_id_seq'::regclass),
    campaign_id integer NOT NULL,
    campaign_reward_name character varying COLLATE pg_catalog."default" NOT NULL,
    campaign_reward_amount integer NOT NULL,
    campaign_reward_description text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT campaign_reward_pkey PRIMARY KEY (campaign_reward_id),
    CONSTRAINT campaign_reward_campaign_id_fkey FOREIGN KEY (campaign_id)
        REFERENCES public.campaign (campaign_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.campaign_reward
    OWNER to postgres;


-- Table: public.campaign_time_extension

-- DROP TABLE IF EXISTS public.campaign_time_extension;

CREATE TABLE IF NOT EXISTS public.campaign_time_extension
(
    time_extension_id integer NOT NULL DEFAULT nextval('campaign_time_extension_time_extension_id_seq'::regclass),
    rejected_message text COLLATE pg_catalog."default",
    campaign_id integer,
    resolved boolean NOT NULL,
    rejected boolean,
    CONSTRAINT campaign_time_extension_pkey PRIMARY KEY (time_extension_id),
    CONSTRAINT campaign_time_extension_campaign_id_fkey FOREIGN KEY (campaign_id)
        REFERENCES public.campaign (campaign_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.campaign_time_extension
    OWNER to postgres;


-- Table: public.campaigner

-- DROP TABLE IF EXISTS public.campaigner;

CREATE TABLE IF NOT EXISTS public.campaigner
(
    campaigner_id integer NOT NULL DEFAULT nextval('campaigner_campaigner_id_seq'::regclass),
    campaigner_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    campaigner_email character varying(50) COLLATE pg_catalog."default" NOT NULL,
    campaigner_password character varying(150) COLLATE pg_catalog."default" NOT NULL,
    campaigner_cnic character varying(50) COLLATE pg_catalog."default" NOT NULL,
    campaigner_contact character varying(50) COLLATE pg_catalog."default" NOT NULL,
    campaigner_image text COLLATE pg_catalog."default",
    office_address text COLLATE pg_catalog."default",
    CONSTRAINT campaigner_pkey PRIMARY KEY (campaigner_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.campaigner
    OWNER to postgres;


-- Table: public.comments

-- DROP TABLE IF EXISTS public.comments;

CREATE TABLE IF NOT EXISTS public.comments
(
    comment_id integer NOT NULL DEFAULT nextval('comments_comment_id_seq'::regclass),
    comment_msg text COLLATE pg_catalog."default" NOT NULL,
    campaign_id integer,
    campaigner_id integer,
    investor_id integer,
    comment_date timestamp without time zone NOT NULL,
    CONSTRAINT comment_pkey PRIMARY KEY (comment_id),
    CONSTRAINT comments_campaign_id_fkey FOREIGN KEY (campaign_id)
        REFERENCES public.campaign (campaign_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT comments_campaigner_id_fkey FOREIGN KEY (campaigner_id)
        REFERENCES public.campaigner (campaigner_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT comments_investor_id_fkey FOREIGN KEY (investor_id)
        REFERENCES public.investor (investor_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.comments
    OWNER to postgres;


-- Table: public.favourites

-- DROP TABLE IF EXISTS public.favourites;

CREATE TABLE IF NOT EXISTS public.favourites
(
    campaign_id integer,
    investor_id integer,
    favourite_id integer NOT NULL DEFAULT nextval('favourites_new_primary_key_seq'::regclass),
    CONSTRAINT favourite_pkey PRIMARY KEY (favourite_id),
    CONSTRAINT favourites_campaign_id_fkey FOREIGN KEY (campaign_id)
        REFERENCES public.campaign (campaign_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT favourites_investor_id_fkey FOREIGN KEY (investor_id)
        REFERENCES public.investor (investor_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.favourites
    OWNER to postgres;


-- Table: public.investor

-- DROP TABLE IF EXISTS public.investor;

CREATE TABLE IF NOT EXISTS public.investor
(
    investor_id integer NOT NULL DEFAULT nextval('investor_investor_id_seq'::regclass),
    investor_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    investor_email character varying(50) COLLATE pg_catalog."default" NOT NULL,
    investor_password character varying(150) COLLATE pg_catalog."default" NOT NULL,
    investor_cnic character varying(50) COLLATE pg_catalog."default" NOT NULL,
    investor_contact character varying(50) COLLATE pg_catalog."default" NOT NULL,
    investor_image text COLLATE pg_catalog."default",
    CONSTRAINT investor_pkey PRIMARY KEY (investor_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.investor
    OWNER to postgres;


-- Table: public.investor_donation

-- DROP TABLE IF EXISTS public.investor_donation;

CREATE TABLE IF NOT EXISTS public.investor_donation
(
    investor_donation_id integer NOT NULL DEFAULT nextval('investor_donation_investor_donation_id_seq'::regclass),
    investor_id integer,
    campaign_id integer,
    investor_donation_amount integer,
    CONSTRAINT investor_donation_pkey PRIMARY KEY (investor_donation_id),
    CONSTRAINT investor_donation_campaign_id_fkey FOREIGN KEY (campaign_id)
        REFERENCES public.campaign (campaign_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT investor_donation_investor_id_fkey FOREIGN KEY (investor_id)
        REFERENCES public.investor (investor_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.investor_donation
    OWNER to postgres;


-- Table: public.investor_equity

-- DROP TABLE IF EXISTS public.investor_equity;

CREATE TABLE IF NOT EXISTS public.investor_equity
(
    investor_equity_id integer NOT NULL DEFAULT nextval('investor_equity_investor_equity_id_seq'::regclass),
    investor_id integer,
    campaign_equity_id integer,
    CONSTRAINT investor_equity_pkey PRIMARY KEY (investor_equity_id),
    CONSTRAINT investor_equity_campaign_equity_id_fkey FOREIGN KEY (campaign_equity_id)
        REFERENCES public.campaign_equity (campaign_equity_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT investor_equity_investor_id_fkey FOREIGN KEY (investor_id)
        REFERENCES public.investor (investor_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.investor_equity
    OWNER to postgres;


-- Table: public.investor_profit

-- DROP TABLE IF EXISTS public.investor_profit;

CREATE TABLE IF NOT EXISTS public.investor_profit
(
    investor_profit_id integer NOT NULL DEFAULT nextval('investor_profit_investor_profit_id_seq'::regclass),
    investor_id integer,
    campaign_profit_id integer,
    investor_amount integer,
    CONSTRAINT investor_profit_pkey PRIMARY KEY (investor_profit_id),
    CONSTRAINT investor_profit_campaign_profit_id_fkey FOREIGN KEY (campaign_profit_id)
        REFERENCES public.campaign_profit (campaign_profit_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT investor_profit_investor_id_fkey FOREIGN KEY (investor_id)
        REFERENCES public.investor (investor_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.investor_profit
    OWNER to postgres;


-- Table: public.investor_reward

-- DROP TABLE IF EXISTS public.investor_reward;

CREATE TABLE IF NOT EXISTS public.investor_reward
(
    investor_reward_id integer NOT NULL DEFAULT nextval('investor_reward_investor_reward_id_seq'::regclass),
    investor_id integer,
    campaign_reward_id integer,
    CONSTRAINT investor_reward_pkey PRIMARY KEY (investor_reward_id),
    CONSTRAINT investor_reward_campaign_reward_id_fkey FOREIGN KEY (campaign_reward_id)
        REFERENCES public.campaign_reward (campaign_reward_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT investor_reward_investor_id_fkey FOREIGN KEY (investor_id)
        REFERENCES public.investor (investor_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.investor_reward
    OWNER to postgres;


-- Table: public.invests

-- DROP TABLE IF EXISTS public.invests;

CREATE TABLE IF NOT EXISTS public.invests
(
    invest_id integer NOT NULL DEFAULT nextval('invests_invest_id_seq'::regclass),
    campaign_id integer,
    investor_id integer,
    invest_amount integer,
    CONSTRAINT invest_pkey PRIMARY KEY (invest_id),
    CONSTRAINT invests_campaign_id_fkey FOREIGN KEY (campaign_id)
        REFERENCES public.campaign (campaign_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT invests_investor_id_fkey FOREIGN KEY (investor_id)
        REFERENCES public.investor (investor_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.invests
    OWNER to postgres;


-- Table: public.milestones

-- DROP TABLE IF EXISTS public.milestones;

CREATE TABLE IF NOT EXISTS public.milestones
(
    milestone_id integer NOT NULL DEFAULT nextval('milestones_milestone_id_seq'::regclass),
    milestone_title character varying(50) COLLATE pg_catalog."default" NOT NULL,
    milestone_desc text COLLATE pg_catalog."default" NOT NULL,
    milestone_date timestamp without time zone NOT NULL,
    campaign_id integer,
    CONSTRAINT milestone_pkey PRIMARY KEY (milestone_id),
    CONSTRAINT milestones_campaign_id_fkey FOREIGN KEY (campaign_id)
        REFERENCES public.campaign (campaign_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.milestones
    OWNER to postgres;


-- Table: public.rejected_campaign

-- DROP TABLE IF EXISTS public.rejected_campaign;

CREATE TABLE IF NOT EXISTS public.rejected_campaign
(
    rejected_id integer NOT NULL DEFAULT nextval('rejected_campaign_rejected_id_seq'::regclass),
    rejected_message text COLLATE pg_catalog."default" NOT NULL,
    campaign_id integer,
    CONSTRAINT rejected_campaign_pkey PRIMARY KEY (rejected_id),
    CONSTRAINT rejected_campaign_campaign_id_fkey FOREIGN KEY (campaign_id)
        REFERENCES public.campaign (campaign_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.rejected_campaign
    OWNER to postgres;