import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class recommendation_model:
    def __init__(self):
        print("""
              If you do not have the following libraries installed, use 'install_libs' function first:
              pandas, numpy, sklearn
              """)
        return

    def install_libs(self):
        import subprocess
        import sys
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'pandas'])
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'numpy'])
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'scikit-learn'])

    def fit(self, dataset):
        schools = pd.read_csv(dataset)
        schools = schools[['name', 'district', 'zip', 'state', 'board', '_id']]
        s = schools.dropna()
        s['state'] = s['state'].apply(lambda x: x.replace(" ", ""))
        s['district'] = s['district'].apply(lambda x: x.split())
        s['zip'] = s['zip'].apply(lambda x: str(x))
        s['zip'] = s['zip'].apply(lambda x: x.split())
        s['state'] = s['state'].apply(lambda x: x.split())
        s['board'] = s['board'].apply(lambda x: x.split())

        s['Tags'] = s['district'] + s['zip'] + s['state'] + s['board']
        self.df = s[['name', 'Tags', '_id']]
        self.df['Tags'] = self.df['Tags'].apply(lambda x: " ".join(x))
        self.df['Tags'] = self.df['Tags'].apply(lambda x: x.lower())

        cv = CountVectorizer(max_features=500)
        vectors = cv.fit_transform(self.df['Tags']).toarray()
        self.similarity = cosine_similarity(vectors)

    def recommend(self, school_name):
        s_index = self.df[self.df['name'] == school_name].index[0]
        distances = self.similarity[s_index]

        list_of_schools = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]
        returnlist = []
        for index, similarity_score in list_of_schools:
            # print(f"School Name: {self.df.iloc[index]['name']}")
        #     print(f"Tags: {self.df.iloc[index]['Tags']}")
        #     # You can choose not to use the '_id' field for any analysis
            returnlist.append(self.df.iloc[index]['_id'])
        #     print("---")

        # return list_of_schools
        return returnlist

# Instantiate the model
# obj1 = recommendation_model()

# # obj1.install_libs() # Uncomment and run this line if you need to install the libraries

# # Fit the model with the dataset
# obj1.fit('connectschools.test.csv')

# # Make a recommendation for a school
# print(obj1.recommend('Vivekananda Kendra Vidyalaya'))
