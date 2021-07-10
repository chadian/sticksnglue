---
id: 139
title: "Working with ZIP Code Data & MySQL"
date: 2013-11-06T14:07:18+00:00
categories:
  - Learning
  - Projects
tags:
  - geolocation
  - mysql
  - zip code
---

I'm working on a project currently where I need to be able to use zip code data, in relation to their longitude and latitude coordinates. I found what I felt was a <a title="Zip Code Data Download" href="http://www.boutell.com/zipcodes/" target="_blank">half decent source of the data</a>. The download file listed at the top says it includes CSV and SQL but I found the SQL implementation to not be quite what I was looking for, at least for MySQL.

**At the bottom of this post you will find the download of the MySQL formatted zip codes.**

With the MySQL database you have the options for doing geometric queries which I haven't delved too far into, but it seemed really useful. I was using this data for proximity-based searches, using someone's zip code.

The SQL that comes with the download is irrelevant to MySQL as it doesn't work with that  <span className="lang:default decode:true  crayon-inline">AddGeometryColumn</span> function.

<pre className="lang:mysql decode:true">create table zcta (
    zip char(5) primary key,
    city varchar(64),
    state char(2),
    type char(1),
    timezone int
);

select AddGeometryColumn('zipcode', 'zcta', 'location', -1, 'POINT', 2);</pre>

However, the CSV data was full of what I needed. So after some looking around I was able to mold the data into the right format that would be applicable to MySQL.

Here's the create table syntax:

<pre className="lang:mysql decode:true">CREATE TABLE `zcta` (
  `zip` char(5) NOT NULL,
  `city` varchar(64) DEFAULT NULL,
  `state` char(2) DEFAULT NULL,
  `dst` char(1) DEFAULT NULL,
  `timezone` int(11) DEFAULT NULL,
  `location` point NOT NULL,
  PRIMARY KEY (`zip`),
  SPATIAL KEY `location` (`location`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;</pre>

The MyISAM engine is apparently better for creating spatial indexes, according to the <a title="MySQL Documentation - Creating Spatial Indexes" href="http://dev.mysql.com/doc/refman/5.1/en/creating-spatial-indexes.html" target="_blank">documentation</a>. It sounds like newer versions of MySQL do have <a title="Restrictions of InnoDB" href="http://dev.mysql.com/doc/refman/5.0/en/innodb-restrictions.html#idm47194372455840" target="_blank">some support for InnoDB</a> and spatial data types:

> `InnoDB` tables do not support spatial data types before MySQL 5.0.16. As of 5.0.16, `InnoDB` supports spatial data types, but not indexes on them.

Alright, so I'm running with the MyISAM engine. I have the CSV file, and the SQL file doesn't apply in this case. After building the table I am now able to import my data. The syntax for POINT columns is a little different so keep that in mind when inserting and selecting data. To get the CSV file into the right format I wrote this find/replace regex to run on the CSV data:

<pre className="lang:default decode:true">Find: ^(((\(|)".*?",){3})"(.*?){1}","(.*?){1}"(,.*)$
Replace: \1 GeomFromText('POINT(\4 \5)')\6</pre>

I then wrote the first part of the INSERT statement defining the necessary columns to be inserted. Run the script and you're data should import and you're ready to go. And that was able to get me the final format to insert the data into the SPATIAL-aware database setup with our long/lat POINT datatypes.

## The end result

The SQL file of zip codes formatted for MySQL based on my create table syntax above:
[MySQL ZIP Codes Data](/wordpress/2013/11/zipcode.sql_.zip)

So far this data has been working out really well for me, let me know if you notice any shortcomings or have any questions. Again, I pulled this data from <a href="http://www.boutell.com/zipcodes/" target="_blank">this blog</a> so if you need any information specific to the source of this data there are some details there. Cheers!
