# Bski Captions 
  
- Search transcriptions and then get video with timestamp/clip  
- user must upload csv transcriptions and vid to s3 bucket like this:  
  
S3 bucket = 
    bucket-name - vids/1/Sequence 01.csv,
                  vids/1/PBS News Sept 3.mp4
                  vids/2/Sequence 02.csv,
                  vids/2/PBS News Sept 4.mp4
                  sample-vids/1/Sequence 22.csv
                  sample-vids/1/hells-kitchen-s5-ep4.mp4
                  sample-vids/2/Sequence 23.csv
                  sample-vids/2/hells-kitchen-s5-ep5.mp4
                  .....

### https://sample.bski.one  
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