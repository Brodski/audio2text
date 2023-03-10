# Bski Captions 
  
- Search transcriptions and then get video with timestamp/clip  
- I made this to help me learn NodeJS and related tech to it.  
  
### https://bski.one  
- A NodeJS server utilizing AWS services and a MongoDB Atlas cluster
- Content is stored in a S3 bucket, contains; many videos and their transcripts with timestamps 
- Server interacts with the end user's search inputs. Queries data in a MongoDB cluster. Uses $filter, cond & regexMatch, $project
- Server Syncs data in the MongoDB cluster with content in an S3 bucket
- Server is deployed in AWS Elastic Beanstalk
- Additional AWS services: 
    - CloudFront (CDN) 
    - Certficate Manager (SSL/HTTPS) 
    - Route 53  
    - CodePipeline  